import Image from "/error.png";

const AdminError = () => {
  return (
    <div className="h-full container flex justify-center items-center">
      <div className="flex flex-col items-center gap-5 mt-10">
        <img src={Image} alt="Error Image" height={100} width={200} />

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl text-center">
            We {"couldn't"} find any matches!
          </h1>

          <p className="text-md text-lightGray text-center font-medium">
            Please check the spelling or try searching something else
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminError;
