import "./App.css";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Login from "./components/Products";

function App() {
	return (
		<>
			<Header />
			<Products />
			<Navbar />
		</>
	);
}

export default App;