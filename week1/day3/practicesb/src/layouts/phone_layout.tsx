

const PhoneLayout = ({ child }: { child: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      <header className="bg-blue-500 text-white p-4 text-center">
        React Practices
      </header>
      <main className="flex-1 overflow-y-auto p-4">{child}</main>
    </div>
  );
};

export default PhoneLayout;
