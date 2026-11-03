export type Faq = { question: string; answer: string };

export const homeFaqs: Faq[] = [
  { question: "How do I make an enquiry?", answer: "Send one of the enquiry forms on this site, or message us on WhatsApp at +94 74 363 8418. We reply to confirm the details of your request." },
  { question: "Is my booking confirmed when I send a form?", answer: "Not yet. A form is an enquiry. Your arrangements are confirmed once we reply and agree the details with you." },
  { question: "Where are you based?", answer: "R.K Travels is based in Negombo, on Sri Lanka's west coast." },
  { question: "Can you help with more than transport?", answer: "Yes. Alongside transfers, rentals and tours, we can help with hotel bookings and house rentals. Mention it in your enquiry." },
];

export const airportFaqs: Faq[] = [
  { question: "What should I include in my request?", answer: "Your name, WhatsApp number, pickup and drop-off locations, travel date, pickup time and number of passengers. A flight number helps us plan around your arrival." },
  { question: "Can you arrange a drop-off for my departure as well?", answer: "Yes. Send a separate request for your departure, or mention both journeys in the additional requirements." },
  { question: "How will I know my transfer is arranged?", answer: "We reply on WhatsApp to confirm the details. Your transfer is arranged once we have confirmed it with you." },
];

export const rentalFaqs: Faq[] = [
  { question: "Which vehicles can I rent?", answer: "We arrange cars, vans, motorcycles and tuk-tuks. Tell us your dates and what you need, and we will confirm what is available." },
  { question: "Can I rent a vehicle with a driver?", answer: "Tell us your preference in the form. Driver availability is confirmed when we reply." },
  { question: "What do I need to rent a vehicle?", answer: "Requirements depend on the vehicle and how you plan to use it. We will explain what is needed when we reply to your enquiry." },
];

export const tourFaqs: Faq[] = [
  { question: "Do you have fixed tour packages?", answer: "Every journey is planned around you. Tell us where you would like to go and how long you have, and we will suggest a plan." },
  { question: "Can you plan a trip for a family or group?", answer: "Yes. Include the number of travellers and any needs, such as child seats or extra luggage space." },
  { question: "Where can the tour start?", answer: "Tell us your pickup location, whether that is the airport, your hotel or somewhere else, and we will plan from there." },
];
