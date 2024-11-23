import { Input } from "@chakra-ui/react";
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import { Alert } from "@/components/ui/alert";
const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const {loading,error,login} = useLogin();
  const handleLogin = () => {
    login(inputs);
  }
  return (
    <>
      <Toaster></Toaster>
      <Input
        size={"sm"}
        fontSize={12}
        placeholder="Email:"
        type="email"
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />
      <Input
        size={"sm"}
        fontSize={12}
        placeholder="Password:"
        type="password"
        value={inputs.password}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
      />
      {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          {error.message}
        </Alert>
      )}
      <Button
        borderRadius={10}
        height={7}
        width={270}
        background={"blue.500"}
        color={"white"}
        laoding
        onClick={handleLogin}
      >
        Log in
      </Button>
    </>
  );
};

export default Login;
