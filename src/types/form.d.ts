declare namespace Form {
  type ForeignLanguage = {
    label: string;
    value: string;
  };

  type WorkExperience = {
    organization: string;
    dateFrom: Date | null;
    dateTo: Date | null;
  };

  type RelativeInfo = {
    fullName: string;
    degreeOfKinship: string;
    dateOfBirth: Date | null;
    placeOfWork: string;
    position: string;
    address: string;
  };

  type FormState = {
    fullName: string;
    dateOfBirth: Date;
    placeOfBirth: string;
    nationality: string;
    partyAffiliation: string;
    education: string;
    specialization: string;
    foreignLanguages: ForeignLanguage[];
    militaryRank: string;
    stateAndDepartmentalAwards: string;
    workExperience: WorkExperience[];
    informationAboutRelatives: RelativeInfo[];
  };
}
