import "./jobs.scss";
import { useState, useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
//import CompaniesGrid from "../../../components/companies/CompaniesGrid.component";
import { IJob } from "../../types/global.typing";
import JobsGrid from "../../components/jobs/JobsGrid.component";
import httpModule from "../../helpers/http.module";

const Jobs = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<IJob[]>("/Job/Get")
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="content jobs">
      <div className="heading">
        <h2>Jobs</h2>
        <Button variant="outlined" onClick={() => navigate("/jobs/add")}>
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : jobs.length === 0 ? (
        <h1>No Job</h1>
      ) : (
        <JobsGrid data={jobs} />
      )}
    </div>
  );
};

export default Jobs;
