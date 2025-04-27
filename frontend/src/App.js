import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography, CircularProgress, Paper } from "@mui/material";
import axios from "axios";

const fantasyBg = "linear-gradient(135deg, #6e48aa 0%, #9d50bb 100%)";

function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setImageUrl(null);
    try {
      const res = await axios.post("http://localhost:5001/api/generate", { prompt });
      setImageUrl(res.data.imageUrl);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to generate image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minHeight="100vh" sx={{ background: fantasyBg, py: 8 }}>
      <Container maxWidth="sm">
        <Paper elevation={8} sx={{ p: 4, borderRadius: 4, background: "rgba(255,255,255,0.95)" }}>
          <Typography variant="h3" align="center" gutterBottom fontFamily="cursive" color="#6e48aa">
            Fantasy Art Generator
          </Typography>
          <Typography align="center" gutterBottom color="text.secondary">
            Enter a description of your fantasy and let AI create stunning art.
          </Typography>
          <TextField
            label="Describe your fantasy art..."
            variant="outlined"
            fullWidth
            multiline
            minRows={2}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            sx={{ my: 2 }}
          />
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            size="large"
            disabled={loading || !prompt.trim()}
            onClick={handleGenerate}
            sx={{ mb: 2, fontWeight: "bold", fontSize: 18 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Generate"}
          </Button>
          {error && <Typography color="error" align="center">{error}</Typography>}
          {imageUrl && (
            <Box mt={4} display="flex" justifyContent="center">
              <img src={imageUrl} alt="Fantasy Art" style={{ maxWidth: "100%", borderRadius: 16, boxShadow: "0 8px 32px #6e48aa44" }} />
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
