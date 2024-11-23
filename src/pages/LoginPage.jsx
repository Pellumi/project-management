import axios from "axios";
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Label } from "../components/ui/Label";
import { Input, Password } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userDetails = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/login`,
        userDetails
      );

      if (response.status === 200) {
        toast.success("Login Successful", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#333",
            color: "#fff",
          },
        });

        setEmail("");
        setPassword("");

        const { id, email, role, token } = response.data;
        const user = {
          id: id,
          email: email,
          role: role,
          token: token,
        };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(user.token));

        navigate(from, { replace: true });
      }
    } catch (error) {
      // console.log(error)
      toast.error(
        error.response?.data?.message || "An error occurred! Please try again.",
        {
          duration: 6000,
          icon: "🚨",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className={`max-w-[468px] w-full`}>
        <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
          <CardTitle className="text-[32px] mb-4 font-medium">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form action="" onSubmit={handleLogin}>
            <div className="mb-4">
              <Label htmlFor="email" className={`mb-2`}>
                Email
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="e.g: jondoe@gmail.com"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password" className={`mb-2`}>
                Password
              </Label>
              <Password
                id="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full flex items-center justify-center">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                `Login`
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
