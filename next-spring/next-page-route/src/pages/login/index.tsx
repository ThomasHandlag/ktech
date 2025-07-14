const Page = () => {
  return (
    <div className="grid grid-cols-5">
      <h1 className="text-2xl font-bold">Login</h1>
      <div className="col-span-2">
        <form className="flex flex-col space-y-4">
          <label>
            Username:
            <input type="text" className="border p-2 w-full" />
          </label>
          <label>
            Password:
            <input type="password" className="border p-2 w-full" />
          </label>
          <button type="submit" className="bg-blue-500 text-white p-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
