import {
  AiOutlineMail,
  AiOutlineApi,
} from "react-icons/ai";
import { TbDeviceDesktopAnalytics, TbBrandReact } from "react-icons/tb";
import { FiLayers, FiSmartphone } from "react-icons/fi";
import { RiFlashlightLine } from "react-icons/ri";
export default function ServiceOffered() {
    return(
        <section className="mt-20 px-4 max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-sky-600 dark:text-sky-400 text-center mb-12">
                Services I Offer
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                {
                    icon: <TbBrandReact className="text-4xl text-sky-500" />,
                    title: "Single Page Applications (SPA)",
                    description: "Dynamic, fast-loading apps with seamless navigation using React.",
                },
                {
                    icon: <AiOutlineMail className="text-4xl text-sky-500" />,
                    title: "Responsive HTML Email Templates",
                    description: "Mobile-friendly, cleanly-coded templates for transactional and marketing emails.",
                },
                {
                    icon: <FiSmartphone className="text-4xl text-sky-500" />,
                    title: "Responsive Web UI Design",
                    description: "Clean, responsive layouts that work beautifully across all screen sizes.",
                },
                // {
                //     icon: <FiLayers className="text-4xl text-sky-500" />,
                //     title: "Reusable UI Components & Design Systems",
                //     description: "Consistent, scalable interfaces built with reusable components.",
                // },
                // {
                //     icon: <AiOutlineApi className="text-4xl text-sky-500" />,
                //     title: "API Integration & Data Handling",
                //     description: "Connecting frontends to REST or Firebase APIs with error handling and loading states.",
                // },
                // {
                //     icon: <RiFlashlightLine className="text-4xl text-sky-500" />,
                //     title: "Performance Optimization",
                //     description: "Reducing load time, improving Lighthouse scores, and delivering smooth user experiences.",
                // },
                ].map((service, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
                >
                    <div className="text-4xl mb-4 text-sky-500">{service.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-sky-700 dark:text-sky-300">
                    {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                    {service.description}
                    </p>
                </div>
                ))}
            </div>
            </section>
    );
}