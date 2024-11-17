import Head from "next/head";
import Link from "next/link";


export default function Sample() {
  return (
    <div>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossorigin="anonymous"
        />
      </Head>
      <div
        className="d-flex justify-content-center align-items-center vh-100"
      >
        <div className="d-flex flex-column w-25">
          <h1 className="text-center">Registration</h1>
          <input className="form-control my-2" type="text" placeholder="Username" />
          <input className="form-control my-2" type="password" placeholder="Password" />
          <input className="form-control my-2" type="password" placeholder="Confirm Password" />
          <button className="btn btn-primary my-2" type="submit">
          <Link href="/login" className="text-white text-decoration-none">
              Submit
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
