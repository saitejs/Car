import { motion } from "framer-motion";

type Props = {

    title: string;

    message: string;
};

const GlassAlertCard = ({
    title,
    message,
}: Props) => {

    return (

        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}

            animate={{
                opacity: 1,
                y: 0,
                scale: [1, 1.01, 1],
            }}

            transition={{
                duration: 0.5,
                scale: {
                    duration: 2,
                    repeat: Infinity,
                },
            }}

            className="

    bg-white
    dark:bg-zinc-900

    border

    border-zinc-200
    dark:border-zinc-800

    rounded-3xl

    p-6

    shadow-md

    text-black
    dark:text-white

    transition-colors

"
        >

            <h2 className="text-2xl font-bold mb-3">
                {title}
            </h2>

            <p className="text-zinc-600 dark:text-zinc-400">
                {message}
            </p>

        </motion.div>
    );
};

export default GlassAlertCard;



{/* <GlassAlertCard

    title="🚨 SOS ALERT"

    message="
    Emergency assistance may
    be required for vehicle
    GJ01AB3331.
    "

/> */}