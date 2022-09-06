import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { trpc } from "../utils/trpc";

const Register: NextPage = () => {
  const router = useRouter();
  const registerMutation = trpc.useMutation(["auth.register"], {
    onSuccess(data) {
      console.log("reg success:", data);
      router.push("/profile/" + data.user.username);
    },
  });
  const [vals, setVals] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setVals({
      ...vals,
      [target.name]: target.value,
    });
  };

  const sub = (e: React.SyntheticEvent) => {
    e.preventDefault();
    registerMutation.mutate(vals);
  };
  if (registerMutation.isLoading) {
    return <div>Loading...</div>;
  }
  // if (registerMutation.error) {
  //   return <div>{JSON.stringify(registerMutation.error)}</div>;
  // }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <a href="./login">Have an account?</a>
            </p>
            {registerMutation.error && (
              <ul className="error-messages">
                <li>{registerMutation.error.message}</li>
              </ul>
            )}
            <form onSubmit={sub}>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Username"
                  value={vals.username}
                  name="username"
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  value={vals.email}
                  name="email"
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  value={vals.password}
                  name="password"
                  onChange={handleChange}
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
