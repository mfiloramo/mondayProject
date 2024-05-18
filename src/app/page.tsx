'use client';
import { ComponentType, ReactElement, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Check } from 'monday-ui-react-core/icons';
import { TextField, Button, Toast } from 'monday-ui-react-core';
import dynamic from "next/dynamic";

const Dropdown: ComponentType<any> = dynamic(() => import('monday-ui-react-core').then(mod => mod.Dropdown), { ssr: false });

interface Fragrance {
  id: number;
  value: number;
  name: string;
  description: string;
  category: string;
  created_at: string;
  updated_at: string;
  image_url: string;
}

export default function Home(): ReactElement {
  // STATE HOOKS
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [fragrances, setFragrances] = useState<Fragrance[]>([]);
  const [selectedFragrances, setSelectedFragrances] = useState<Fragrance[]>([]);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isDropdownLoading, setIsDropdownLoading] = useState(true);
  const [confirmButton, setConfirmButton] = useState('Submit Order');
  const [submitSuccessButtonColor, setSubmitSuccessButtonColor] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState('');

  const environmentAPI: string = 'https://monday-candle-api-bc20eb8556ae.herokuapp.com'

  // EFFECT HOOKS
  useEffect((): void => {
    const fetchFragrances = async (): Promise<void> => {
      try {
        const response = await axios.get(`https://monday-candle-api-bc20eb8556ae.herokuapp.com/api/fragrances`);
        console.log(response.data);
        if (response.data.fragrances) {
          setFragrances(response.data.fragrances);
        }
      } catch (error) {
        console.error('Error fetching fragrances:', error);
      } finally {
        setIsDropdownLoading(false);
      }
    };

    fetchFragrances();
  }, []);

  useEffect((): void => {}, [selectedFragrances]);

  const options = useMemo(
    () =>
      fragrances.map((fragrance: Fragrance) => ({
        value: fragrance.id.toString(),
        label: fragrance.name,
      })),
    [fragrances]
  );

  // HANDLER FUNCTIONS
  const handleClearForm = (): void => {
    setFirstName('');
    setLastName('');
    setQuantity(0);
    setSelectedFragrances([]);
    setIsButtonLoading(false);
    setConfirmButton('Submit Order');
    setShowToast(false);
  };

  const handleStartOrder = (): void => {
    setIsButtonLoading(true);
    setConfirmButton('');
    if (selectedFragrances.length === 3) {
      const orderPayload = {
        first_name: firstName,
        last_name: lastName,
        number_of_kits: quantity,
        fragrance1_id: parseInt(String(selectedFragrances[0].value)),
        fragrance2_id: parseInt(String(selectedFragrances[1].value)),
        fragrance3_id: parseInt(String(selectedFragrances[2].value)),
      };

      // setTimeouts ADDED FOR SIMULATED "LOADING" EFFECT
      axios
        .post(`https://monday-candle-api-bc20eb8556ae.herokuapp.com/api/orders`, orderPayload)
        .then((): void => {
          setTimeout((): void => {
            setIsButtonLoading(false);
            setConfirmButton('Success');
            setToastText('Order successfully placed!');
            setShowToast(true);
            setTimeout((): void => {
              setShowToast(false);
              handleClearForm(); // CLEAR FORM AFTER HIDING TOAST
            }, 3000); // HIDE TOAST AFTER 2 SECONDS
          }, 2000); // SHOW TOAST AFTER 2 SECONDS
        })
        .catch((error): void => {
          console.error('Error:', error);
          setTimeout((): void => {
            setIsButtonLoading(false);
            setConfirmButton('Submit Order');
            setToastText('An error occurred. Please try again.');
            setShowToast(true);
            setTimeout((): void => {
              setShowToast(false);
              handleClearForm(); // CLEAR FORM AFTER HIDING TOAST
            }, 3000); // HIDE TOAST AFTER 2 SECONDS
          }, 2000); // SHOW TOAST AFTER 2 SECONDS
        });
    } else {
      setIsButtonLoading(false);
      setConfirmButton('Submit Order');
      setToastText('Must select exactly 3 fragrances to start the order.');
      setShowToast(true);
      setTimeout((): void => {
        setShowToast(false); // HIDE TOAST AFTER 2 SECONDS
      }, 3000);
      console.error('Must select exactly 3 fragrances to start the order.');
    }
  };

  const handleSelectionChange = (selected: Fragrance[]): void => {
    setSelectedFragrances(selected);
    if (selected.length > 3) {
      setToastText('Must select exactly 3 fragrances to start the order.');
      setShowToast(true);
    } else {
      setShowToast(false);
    }
  };

  // RENDER COMPONENT
  return (
    // MAIN COMPONENT CONTAINER
    <>
      <h1 className={'text-2xl font-bold text-center my-5'}>Candlebox Order Maker</h1>
      <div className="flex flex-col bg-slate-200 justify shadow-xl p-5 mt-5 mx-auto w-full max-w-xl rounded">
        {/* TOP ROW CONTAINER */}
        <div className="flex flex-row gap-5 text-left text-black w-max">
          {/* NAME INPUT CONTAINER */}
          <div className="flex flex-col">
            First Name
            <TextField
              className="!min-w-64"
              placeholder="Enter Customer First Name..."
              value={firstName}
              onChange={(e: any) => setFirstName(e)}
              size={TextField.sizes.SMALL}
            />
          </div>
          <div className="flex flex-col">
            Last Name
            <TextField
              className="!min-w-64"
              placeholder="Enter Customer Last Name..."
              value={lastName}
              onChange={(e: any) => setLastName(e)}
              size={TextField.sizes.SMALL}
            />
          </div>
        </div>
        {/* END TOP ROW CONTAINER */}

        {/* FRAGRANCE SELECTOR AND QUANTITY SELECTOR CONTAINER */}
        <div className="flex flex-row items-end gap-4 my-4">
          {/* FRAGRANCE SELECTOR */}
          <div className="flex-grow">
            Fragrance Order Selection
            <Dropdown
              placeholder="Select Exactly 3 Fragrances..."
              options={options}
              isLoading={isDropdownLoading}
              multi
              multiline
              clearable={false}
              className="dropdown-stories-styles_with-chips"
              value={selectedFragrances}
              onChange={handleSelectionChange}
            />
          </div>

          {/* QUANTITY SELECTOR */}
          <div className="flex items-center gap-1.5 mb-0">
            <button
              className="p-2 bg-gray-200 rounded"
              onClick={() => setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0))}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="p-2 bg-gray-200 rounded"
              onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        {/* ORDER BUTTONS CONTAINER */}
        <div className="flex flex-row text-center mx-auto gap-5">
          {/* SUBMIT ORDER BUTTON */}
          <Button
            key={1}
            color={confirmButton === 'Success' ? Button.colors.POSITIVE : Button.colors.PRIMARY}
            successIcon="check"
            className="!min-w-40 mx-auto"
            success={submitSuccessButtonColor}
            loading={isButtonLoading}
            onClick={handleStartOrder}
            disabled={!firstName || !lastName || selectedFragrances.length !== 3}
          >
            {confirmButton === 'Success' && <Check className="-ml-3 mr-1" />}
            {confirmButton}
          </Button>

          {/* CLEAR FORM BUTTON */}
          <Button
            key={2}
            color={Button.colors.NEGATIVE}
            className="!min-w-40"
            onClick={handleClearForm}
          >
            Clear Form
          </Button>
        </div>
        {/* END ORDER SUBMIT/CLEAR BUTTON CONTAINER */}

        {/* ALERT BANNER */}
        <Toast
          className="monday-storybook-alert-banner_big-container my-4 !mx-auto !max-w-[40vw] !min-w-[650px]"
          autoHideDuration={3000}
          open={showToast}
          onClose={() => setShowToast(false)}
        >
          {toastText}
        </Toast>
      </div>
    </>
    // END MAIN COMPONENT CONTAINER
  );
}
