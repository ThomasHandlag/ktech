const Page = () => {
  return (
    <div className="grid grid-cols-5">
      <h1 className="text-2xl font-bold">Contact</h1>
      <div className="col-span-2">
        <form className="flex flex-col space-y-4">
          <label>
            Name:
            <input type="text" className="border p-2 w-full" />
          </label>
          <label>
            Email:
            <input type="email" className="border p-2 w-full" />
          </label>
          <label>
            Message:
            <textarea className="border p-2 w-full" rows={4}></textarea>
          </label>
          <button type="submit" className="bg-blue-500 text-white p-2">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
