import "./candidates.scss";
import { useState, useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { ICandidate } from "../../types/global.typing";
import httpModule from "../../helpers/http.module";
import CandidatesGrid from "../../components/candidates/CandidatesGrid.component";

const Candidates = () => {
  const [candidates, setCandidates] = useState<ICandidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<ICandidate[]>("/Candidate/Get")
      .then((res) => {
        setCandidates(res.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="content candidates">
      <div className="heading">
        <h2>Candidates</h2>
        <Button variant="outlined" onClick={() => navigate("/candidates/add")}>
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : candidates.length === 0 ? (
        <h1>No Candidate</h1>
      ) : (
        <CandidatesGrid data={candidates} />
      )}
    </div>
  );
};

export default Candidates;
