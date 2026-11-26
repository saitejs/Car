const Skeleton = ({
    className = "",
}: {
    className?: string;
}) => {

    return (

        <div
            className={`

                animate-pulse

                rounded-2xl

                bg-zinc-200
                dark:bg-zinc-800

                ${className}

            `}
        />
    );
};

export default Skeleton;