import Skeleton
    from "./Skeleton";

const SkeletonStatCard = () => {

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

            <Skeleton
                className="h-5 w-32"
            />

            <Skeleton
                className="h-10 w-24"
            />

            <Skeleton
                className="h-12 w-12 rounded-full"
            />

        </div>
    );
};

export default SkeletonStatCard;