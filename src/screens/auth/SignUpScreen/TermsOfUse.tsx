import {useNavigation} from '@react-navigation/native';
import React from 'react';
import ArrowLeftBack from '../../../components/ArrowLeftBack/ArrowLeftBack';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';

const TermsOfUse = () => {
  const navigation = useNavigation();
  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title="Terms of use"
          />
          <RN.ScrollView>
            <RN.View style={styles.contnet}>
              {/* <TextView textAlign="left" title="Agreement" /> */}
              <TextView
                textAlign="left"
                text={`User agreement This User Agreement (hereinafter referred to as the Agreement) regulates the relationship between the owner (hereinafter referred to as the Temporary System or Bakkoura Administration), on the one hand, and the user of the application, on the other. The Bakkoura Time System application is not a media outlet.`}
              />
              <TextView
                textAlign="left"
                text={`By using the application, you agree to the terms of this agreement. If you do not agree to the terms of this agreement, do not use the Bakkoura Time System app!`}
              />
              <TextView
                textAlign="left"
                text={`Rights and obligations of the parties
The user has the right to:
- use the application information for personal, non-commercial purposes
- use the application information for commercial purposes with the permission of the copyright holders`}
              />
              <TextView
                textAlign="left"
                text={`The administration has the right to:
- at your discretion and the need to create, change, cancel rules
- restrict access to any information in the application
- create, modify, delete information
- delete accounts`}
              />
              <TextView
                textAlign="left"
                text={`The User undertakes to:
- Do not use unwanted content
- Do not abuse unwanted content
- to ensure the safety of personal data from access by third parties
- do not disrupt the functionality of the application
- Do not create multiple accounts in the application if they actually belong to the same person
- do not transfer your account and/or login and password from your account to third parties
- do not use scripts (programs) for automated information collection and/or interaction with the application and its services`}
              />
              <TextView
                textAlign="left"
                text={`The Administration undertakes to::
- maintain the functionality of the application, except in cases where this is impossible for reasons beyond the control of the Administration.
- to provide comprehensive protection of the User account
- protect information, the dissemination of which is restricted or prohibited by law, by issuing a warning or deleting the account of the user who violated the rules`}
              />
              <TextView
                textAlign="left"
                text={`Responsibility of the parties
- the user bears full personal responsibility for the information disseminated by him
- the Administration is not responsible for the discrepancy between the services expected by the User and those actually received
- the administration is not responsible for the services provided by third parties
- in the event of a force majeure situation (military operations, state of emergency, natural disaster, etc.), the Administration does not guarantee the safety of the information posted by the User, as well as the uninterrupted operation of the information resource`}
              />
              <TextView
                textAlign="left"
                text={`Terms of the Agreement
This Agreement comes into force from the moment of registration in the application.
The Agreement becomes invalid upon the appearance of its new version.
The Administration reserves the right to unilaterally amend this agreement at its discretion.
If the agreement is changed, in some cases, the administration can notify users in a convenient way.
              `}
              />
            </RN.View>
          </RN.ScrollView>
        </RN.View>
      }
    />
  );
};

export default TermsOfUse;

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  contnet: {
    gap: 10,
    paddingBottom: 100,
  },
});
