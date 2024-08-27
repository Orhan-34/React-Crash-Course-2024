import React from "react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPageDetail, { jobPageDetailLoader } from "./pages/JobPageDetail";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

const App = () => {
	const addJobForm = async (newJob) => {
		const res = await fetch("/api/jobs", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newJob),
		});
		return;
	};

	const deleteJobForm = async (id) => {
		const res = await fetch(`/api/jobs/${id}`, {
			method: "DELETE",
		});
		return;
	};

	const updateJobSubmitForm = async (newJob) => {
		const res = await fetch(`/api/jobs/${newJob.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newJob),
		});
		return;
	};

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<MainLayout />} errorElement={<NotFoundPage />}>
				<Route index element={<HomePage />} />
				<Route
					path="/add-job"
					element={<AddJobPage addJobSubmitForm={addJobForm} />}
				/>
				<Route path="/jobs" element={<JobsPage />} />
				<Route
					path="/jobs/:id"
					element={<JobPageDetail deleteJobForm={deleteJobForm} />}
					loader={jobPageDetailLoader}
				/>
				<Route
					path="/edit-page/:id"
					element={<EditJobPage updateJobSubmitForm={updateJobSubmitForm} />}
					loader={jobPageDetailLoader}
				/>
			</Route>,
		),
	);

	return <RouterProvider router={router} />;
};

export default App;
