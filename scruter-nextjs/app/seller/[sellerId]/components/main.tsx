import { useGlobalListing } from "@/context/GlobalListingProvider";
import { MouseEventHandler } from "react";
import ListingDetails from "./listingDetails";

const Main = ({ sellerId }: { sellerId: string }) => {
  const {
    listingName,listingCategory,listingPrice,listingDescription,
    setValidListingName,setValidListingCategory,setValidListingPrice,setValidListingDescription,
    currentStep, setCurrentStep,formCompleted, setFormCompleted ,completed, setCompleted } = useGlobalListing();

  currentStep === 1 ? setCompleted(false) : setCompleted(true);

  const nextStep: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    let allValid = true;

    // Validate each field and update validity states
    if (listingName.trim().length < 1) {
      setValidListingName(false);
      allValid = false;
    } else {
      setValidListingName(true);
    }

   
    // Move to the next step only if all fields are valid
    if (allValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setCurrentStep(currentStep - 1);
  };

 
  return (
    <div className="md:overflow-hidden md:min-h-full md:shadow-none shadow-md mx-auto md:m-0 rounded-xl md:rounded-none md:w-full w-[100%] md:bg-transparent min-h-[400px] bg-white z-10 mt-[84px]">
      <form className="md:mx-16 md:my-0 mx-6 my-6 py-0 md:py-2 relative h-full">
        {/* {currentStep} */}
        {currentStep === 1 && <ListingDetails/>}

        {!formCompleted && (
          <footer className="md:block hidden w-full left-0 right-0 bottom-0">
            <div className="flex">
              <div className="mr-auto mt-2">
                {completed && (
                  <button onClick={goBack} className={"bg-customTeal rounded-lg p-2"}>
                    Go Back
                  </button>
                )}
              </div>
              <div className="text-right text-sm mt-2">
                <button
                  onClick={currentStep === 3 ? (e)=>{
                    e.preventDefault()
                    
                   } : nextStep}
                  className={
                    currentStep === 3
                      ? "bg-customBlue rounded-lg p-2"
                      : "bg-customTeal rounded-lg p-2"
                  }
                >
                  {currentStep === 3 ? "Confirm" : "Next Step"}
                </button>
              </div>
            </div>
          </footer>
        )}

        {!formCompleted && (
          <footer className="fixed  md:hidden block w-full p-3 left-0 right-0 bottom-0">
            <div className="flex">
              <div className="mr-auto">
                {completed && (
                  <button onClick={goBack} className={"bg-transparent text-gray-400 hover:text-customTeal"}>
                    Go Back
                  </button>
                )}
              </div>
              <div className="text-right">
                <button
                  onClick={currentStep === 3 ? (e)=>{
                    e.preventDefault()
                   
                   } : nextStep}
                  className={currentStep === 3 ? "bg-customBlue" : "bg-customTeal"}
                >
                  {currentStep === 3 ? "Confirm" : "Next Step"}
                </button>
              </div>
            </div>
          </footer>
        )}
      </form>
    </div>
  );
};

export default Main;
