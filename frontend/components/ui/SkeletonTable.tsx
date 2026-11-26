import Skeleton
    from "./Skeleton";

const SkeletonTable = () => {

    return (

        <div
            className="

                bg-white
                dark:bg-zinc-900

                rounded-3xl

                p-6

                shadow-md

                space-y-4

            "
        >

            {Array.from({
                length: 5,
            }).map((_, index) => (

                <div
                    key={index}
                    className="flex gap-4"
                >

                    <Skeleton
                        className="h-10 w-10 rounded-full"
                    />

                    <Skeleton
                        className="h-10 flex-1"
                    />

                </div>

            ))}

        </div>
    );
};

export default SkeletonTable;