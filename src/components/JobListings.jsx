import React, { useEffect, useState } from "react";
import JobListing from "./JobListing";
import LoadingSpinner from "./LoadingSpinner";

const JobListings = ({ isHomeUrl }) => {
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchJobs = async () => {
			const apiUrl = isHomeUrl ? "api/jobs?_limit=3" : "api/jobs";
			try {
				const response = await fetch(apiUrl);
				const data = await response.json();
				setJobs(data);
			} catch (error) {
				console.log("Error catching data", error);
			} finally {
				setLoading(false);
			}
		};
		fetchJobs();
	}, [isHomeUrl]);

	return (
		<section className="bg-blue-50 px-4 py-10">
			<div className="container-xl lg:container m-auto">
				<h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
					{isHomeUrl ? "~ Recent Jobs ~" : "~ All Jobs ~"}
				</h2>
				{loading ? (
					<LoadingSpinner loading={loading} />
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
						{jobs.map((job) => (
							<JobListing key={job.id} job={job} />
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default JobListings;
