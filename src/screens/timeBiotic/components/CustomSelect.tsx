import React, {useState} from 'react';

import {Images} from '../../../assets';
import RN from '../../../components/RN';
import {COLORS} from '../../../utils/colors';
import Input from '../../../components/Input/Input';
import {verticalScale} from '../../../utils/dimensions';
import {observer} from 'mobx-react-lite';

const CustomDropdownInput = ({ options, onSelect, black }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = option => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <RN.View style={styles.container}>
      <RN.TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <Input
          black={true}
          title="Country"
          editable={false}
          // onPressIn={() => { }}
          // onChangeText={() => { }}
          placeholder="Select Option"
          icon={<Images.Svg.darkDownArrow />}
          iconPress={() => setIsOpen(!isOpen)}
          value={selectedOption ? selectedOption.label : ''}
        />
      </RN.TouchableOpacity>
      {isOpen && (
        <RN.View style={styles.dropdownOptions}>
          {options.map(option => (
            <RN.TouchableOpacity
              key={option.value}
              onPress={() => handleSelect(option)}
              style={styles.optionItem}>
              <RN.Text style={styles.optionText}>{option.label}</RN.Text>
            </RN.TouchableOpacity>
          ))}
        </RN.View>
      )}
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    position: 'relative',
  },
  dropdownOptions: {
    left: 0,
    right: 0,
    zIndex: 1,
    top: '100%',
    borderRadius: 30,
    borderWidth: 1,
    position: 'absolute',
    backgroundColor: COLORS.black,
  },
  optionItem: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  select: {
    width: '100%',
    borderRadius: 50,
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    backgroundColor: COLORS.black,
    paddingVertical: verticalScale(15),
  },
  label: {
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 10,
    color: COLORS.grey,
  },
});

export default observer(CustomDropdownInput);
