import Skeleton
    from "./Skeleton";

const SkeletonChart = () => {

    return (

        <div
            className="

                bg-white
                dark:bg-zinc-900

                rounded-3xl

                p-6

                shadow-md

            "
        >

            <Skeleton
                className="h-8 w-64 mb-6"
            />

            <Skeleton
                className="h-[300px] w-full"
            />

        </div>
    );
};

export default SkeletonChart;