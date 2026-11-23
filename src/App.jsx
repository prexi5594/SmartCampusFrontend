import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthPage from "./components/AuthPage";

import HomePage from "./pages/HomePage";
import ExploreCampusPage from "./pages/ExploreCampusPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

import facilities from "./data/facilities";
import campusApi from "./services/campusApi";

function getAuthenticatedUser(data) {
  const user = data?.user || (data?.id != null ? data : null);

  if (!user || user.id == null) {
    throw new Error("The authentication server did not return a user ID.");
  }

  return user;
}

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFacilityId, setSelectedFacilityId] = useState(null);
  const [user, setUser] = useState(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [sessionError, setSessionError] = useState("");
  const [logoutError, setLogoutError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      try {
        const session = await campusApi.session();
        const authenticatedUser = getAuthenticatedUser(session);
        campusApi.setUser(authenticatedUser);

        if (isMounted) {
          setUser(authenticatedUser);
        }
      } catch (error) {
        campusApi.setUser(null);

        if (isMounted) {
          setUser(null);
          setSessionError(error.status === 401 ? "" : error.message);
        }
      } finally {
        if (isMounted) {
          setIsCheckingSession(false);
        }
      }
    }

    restoreSession();
    return () => {
      isMounted = false;
    };
  }, []);

  async function handleAuthentication({ mode, displayName, email, password }) {
    setSessionError("");

    if (mode === "register") {
      await campusApi.register(displayName, email, password);
      campusApi.setUser(null);
      return { accountCreated: true };
    }

    const response = await campusApi.login(email, password);
    const authenticatedUser = getAuthenticatedUser(response);

    campusApi.setUser(authenticatedUser);
    setUser(authenticatedUser);
    setCurrentPage("home");
    setSearchQuery("");
    setSelectedFacilityId(null);
  }

  async function handleLogout() {
    setLogoutError("");
    setIsLoggingOut(true);

    try {
      await campusApi.logout();
      campusApi.setUser(null);
      setUser(null);
      setCurrentPage("home");
      setSearchQuery("");
      setSelectedFacilityId(null);
    } catch (error) {
      setLogoutError(error.message);
    } finally {
      setIsLoggingOut(false);
    }
  }

  function handleSearch(query) {
    setSearchQuery(query);
    setCurrentPage("explore");
  }

  const filteredFacilities = facilities.filter((facility) =>
    `${facility.name} ${facility.category} ${facility.location}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  function navigateTo(page) {
    setSearchQuery("");
    setSelectedFacilityId(null);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }

  function handleViewLocation(facility) {
    handlePlaceSelect(facility.routeId);
  }

  function handlePlaceSelect(placeId) {
    setSearchQuery("");
    setSelectedFacilityId(placeId);
    setCurrentPage("explore");
  }

  function renderPage() {
    switch (currentPage) {
      case "explore":
        return (
          <ExploreCampusPage
            facilities={filteredFacilities}
            routeFacilities={facilities}
            selectedFacilityId={selectedFacilityId}
          />
        );

      case "about":
        return <AboutPage />;

      case "contact":
        return <ContactPage />;

      case "home":
      default:
        return (
          <HomePage
            facilities={facilities}
            onSearch={handleSearch}
            onExplore={() => navigateTo("explore")}
            onViewLocation={handleViewLocation}
            onPlaceSelect={handlePlaceSelect}
            onContact={() => navigateTo("contact")}
          />
        );
    }
  }

  if (isCheckingSession) {
    return (
      <div className="auth-loading" role="status">
        Checking your campus session…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app">
        <AuthPage
          initialError={sessionError}
          onSubmit={handleAuthentication}
        />
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onLogout={handleLogout}
        isLoggingOut={isLoggingOut}
      />

      {logoutError && (
        <p className="auth-error app-error" role="alert">
          {logoutError}
        </p>
      )}

      <main>{renderPage()}</main>

      <Footer />
    </div>
  );
}

export default App;