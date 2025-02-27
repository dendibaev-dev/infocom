export const initialFormState: Form.FormState = {
  fullName: "",
  dateOfBirth: new Date(),
  placeOfBirth: "",
  nationality: "",
  partyAffiliation: "",
  education: "",
  specialization: "",
  foreignLanguages: [],
  militaryRank: "",
  stateAndDepartmentalAwards: "",
  workExperience: [
    {
      organization: "",
      dateFrom: null,
      dateTo: null,
    },
  ],
  informationAboutRelatives: [
    {
      fullName: "",
      degreeOfKinship: "relative",
      dateOfBirth: null,
      placeOfWork: "",
      position: "",
      address: "",
    },
  ],
};
