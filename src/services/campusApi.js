
let activeUserId = null;

async function request(path, options = {}) {
  const method = options.method || "GET";

  const headers = {
    Accept: "application/json",
  };

  if (method !== "GET") {
    headers["Content-Type"] = "application/json";
    headers["X-Campus-Request"] = "1";
  }

  if (activeUserId) {
    headers["X-Campus-User"] = activeUserId;
  }

  let response;

  try {
    response = await fetch(`/api${path}`, {
      method,
      headers,
      credentials: "same-origin",
      cache: "no-store",
      body:
        options.body === undefined
          ? undefined
          : JSON.stringify(options.body),
    });
  } catch {
    throw new Error("Cannot connect to the campus server.");
  }

  let data = null;

  if (response.status !== 204) {
    try {
      data = await response.json();
    } catch {
      throw new Error("The server returned an invalid response.");
    }
  }

  if (!response.ok) {
    const detail = data?.detail || "The request could not be completed.";

    const error = new Error(detail);
    error.status = response.status;

    if (response.status === 409 && data?.code === "session_changed") {
      activeUserId = null;
    }

    throw error;
  }

  return data;
}

const recordPath = (namespace, key) =>
  `/data/${encodeURIComponent(namespace)}` +
  (key === undefined ? "" : `/${encodeURIComponent(key)}`);

const campusApi = {
  request,

  setUser(user) {
    activeUserId = user?.id || null;
  },

  register(display_name, email, password) {
    return request("/auth/register", {
      method: "POST",
      body: { display_name, email, password },
    });
  },

  login(email, password) {
    return request("/auth/login", {
      method: "POST",
      body: { email, password },
    });
  },

  session() {
    return request("/auth/session");
  },

  logout() {
    return request("/auth/logout", {
      method: "POST",
      body: {},
    });
  },

  get(namespace, key) {
    return request(recordPath(namespace, key));
  },

  put(namespace, key, value) {
    return request(recordPath(namespace, key), {
      method: "PUT",
      body: { value },
    });
  },

  remove(namespace, key) {
    return request(recordPath(namespace, key), {
      method: "DELETE",
      body: {},
    });
  },

  async list(namespace) {
    const records = [];
    let offset = 0;

    do {
      const page = await request(
        `${recordPath(namespace)}?limit=100&offset=${offset}`
      );

      records.push(...page.records);
      offset = page.next_offset;
    } while (offset !== null);

    return records;
  },
};

export default campusApi;
