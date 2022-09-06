import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { ChangeEvent } from "react";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const Login: NextPage = () => {
  const [vals, setVals] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setVals({
      ...vals,
      [target.name]: target.value,
    });
  };

  const loginMutation = trpc.useMutation(["auth.login"], {
    onSuccess(data) {
      console.log("login success:", data);
      router.push("/profile/" + data.user.username);
    },
    onError(err) {
      console.log(err);
    },
  });

  // const { data, isLoading } = trpc.useQuery([
  //   "auth.byUsername",
  //   { username: "from tRPC" },
  // ]);

  const handleSubmit = (e: React.FormEvent) => {
    loginMutation.mutate(vals);
    e.preventDefault();
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Log in</h1>
            <p className="text-xs-center">
              <a href="./register">New to Conduit?</a>
            </p>
            {loginMutation.error && ( // TODO upgrade error reports
              <ul className="error-messages">
                <li>{loginMutation.error.message}</li>
              </ul>
            )}
            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={vals.username}
                  onChange={handleChange}
                />
              </fieldset>

              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={vals.password}
                  onChange={handleChange}
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
