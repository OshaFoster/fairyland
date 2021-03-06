import React from "react"

function SigninComponent(props) {
        return (
            <div className="signinBox">
                <form onSubmit={props.handleSubmit}>
                    <h3>Sign In</h3>
                    <input className="signin" onChange={props.handleChange} value={props.username} name="username" type="text" placeholder="username" />
                    <input className="signin" onChange={props.handleChange} value={props.password} name="password" type="password" placeholder="password" />
                    <button className="signin" type="submit">Submit</button>
                    <p>{props.errMsg}</p>
                </form>
            </div>
        )
}

export default SigninComponent