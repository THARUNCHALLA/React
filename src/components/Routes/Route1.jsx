import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Contact from './Contact';
import NavBar from './NavBar';
import User from './User';
import UserDetails from './UserDetails';
import NotFound from "./NotFound";
import Project from "./Project";
import FeaturedProject from "./FeaturedProject";
import NewProject from "./NewProject";
import Login from "./Login";
import Logout from "./Logout";
import PrivateRoute from "./PrivateRoute";
import AuthProvider from "./AuthProvider";

const LazyAbout = lazy(() => import('./About'));

const Route1 = () => {
    return (
        <AuthProvider>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />

                <Route
                    path="/about"
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <LazyAbout />
                        </Suspense>
                    }
                />

                <Route path="/contact" element={<Contact />} />

                <Route path="/project" element={<Project />}>
                    <Route index element={<FeaturedProject />} />
                    <Route path="FeaturedProject" element={<FeaturedProject />} />
                    <Route path="NewProject" element={<NewProject />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

                {/* Protected Route */}
                <Route
                    path="/user"
                    element={
                        <PrivateRoute>
                            <User />
                        </PrivateRoute>
                    }
                />

                <Route path="/users/:id" element={
                    <PrivateRoute>
                        <UserDetails />
                    </PrivateRoute>
                } />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AuthProvider>
    );
};

export default Route1;
