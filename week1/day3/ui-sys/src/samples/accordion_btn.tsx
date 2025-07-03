import { useState } from "react";

type AccordionButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

const AccordionButton = (props: AccordionButtonProps) => {
  const { label, isActive, onClick } = props;
  return (
    <button
      className={`w-full px-4 py-3 text-lg font-medium text-gray-800 ${
        isActive ? "bg-green-500 text-white" : "bg-gray-200 hover:bg-gray-300"
      } transition-colors duration-200`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

type AccordionContentProps = {
  children: React.ReactNode;
  isActive: boolean;
};

const AccordionContent = (props: AccordionContentProps) => {
  const { children, isActive } = props;
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isActive ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
      }`}
    >
      <div className="p-4 bg-white text-gray-700">{children}</div>
    </div>
  );
};

const Accordions = () => {
  const accordionData = [
    {
      id: 1,
      label: "HISTORY",
      content:
        "Content for History goes here. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
    },
    {
      id: 2,
      label: "APPROACH",
      content:
        "Content for Approach goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 3,
      label: "CULTURE",
      content:
        "Content for Culture goes here. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 4,
      label: "METHOD",
      content:
        "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
    },
  ];

  const [singleActive, setSingleActive] = useState<number>(1); 
  const [multiActive, setMultiActive] = useState<number[]>([]);

  const handleSingleClick = (id: number) => {
    setSingleActive(singleActive === id ? 1 : id);
  };

  const handleMultiClick = (id: number) => {
    setMultiActive((prevActive) =>
      prevActive.includes(id)
        ? prevActive.filter((item) => item !== id)
        : [...prevActive, id]
    );
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Button Accordions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Single Accordions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Single Accordions</h2>
          <div className="space-y-2">
            {accordionData.map((item) => (
              <div key={item.id}>
                <AccordionButton
                  label={item.label}
                  isActive={singleActive === item.id}
                  onClick={() => handleSingleClick(item.id)}
                />
                {singleActive === item.id && (
                  <AccordionContent isActive={true}>
                    {item.content}
                  </AccordionContent>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Multi Accordions</h2>
          <div className="space-y-2">
            {accordionData.map((item) => (
              <div key={item.id}>
                <AccordionButton
                  label={item.label}
                  isActive={multiActive.includes(item.id)}
                  onClick={() => handleMultiClick(item.id)}
                />
                {multiActive.includes(item.id) && (
                  <AccordionContent isActive={true}>
                    {item.content}
                  </AccordionContent>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordions;
