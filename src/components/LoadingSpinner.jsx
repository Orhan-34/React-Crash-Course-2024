import React from "react";
import { HashLoader } from "react-spinners";

const override = {
	display: "block",
	margin: "0 auto",
	borderColor: "red",
};

const LoadingSpinner = ({ loading }) => {
	return (
		<>
			<HashLoader
				color="#2563EB"
				size={50}
				loading={loading}
				cssOverride={override}
				aria-label="Loading Spinner"
			/>
		</>
	);
};

export default LoadingSpinner;
