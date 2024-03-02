import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
interface LoginPageProps {
  onLogin: (username: string) => void;
  error: string;
}

function Login({ onLogin, error }: LoginPageProps) {
  const [userName, setUsername] = useState("");

  const handleLogin = async (event: any) => {
    event.preventDefault();
    onLogin(userName);
  };
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Grid
        container
        item
        xs={9}
        sx={{
          backgroundColor: "#c4c4c4",
        }}
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Grid item xs={5}>
          <Typography variant="h1" align="center">
            Bem-vindos <br />
            ao <br /> Chat Online!
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={3} alignItems="center" justifyContent="center">
        <Grid item>
          <Typography variant="h4">Acessar chat:</Typography>
          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              required
              label="Digite nome de usuario"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button fullWidth variant="outlined" type="submit">
              Acessar
            </Button>
            {error && <FormHelperText error>{error}</FormHelperText>}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
