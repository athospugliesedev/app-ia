import React, { useState } from 'react';
import { Text, YStack, Button, ButtonText, Image } from "tamagui";
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home() {
  const [img, setImg] = useState<string | undefined>();
  const [label, setLabel] = useState<string | undefined>();

  const labelMapping: Record<string, { displayName: string; iconName: string }> = {
    fish: { displayName: 'Peixe', iconName: 'fish' },
    jellyfish: { displayName: 'Água-viva', iconName: 'water' },
    shark: { displayName: 'Tubarão', iconName: 'shark' },
    turtle: { displayName: 'Tartaruga', iconName: 'turtle' },
  };

  const pickImg = async (): Promise<void> => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri: string = result.assets[0].uri;
      const imageData: Blob = await fetch(imageUri).then((response) => response.blob());

      query(imageData).then((response) => {
        const firstLabel = response[0]?.label;
        setLabel(firstLabel);
        setImg(imageUri);
      });
    }
  };

  async function query(imageData: Blob): Promise<any> {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/athospugliese/sea-animals",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: imageData,
      }
    );
    const result = await response.json();
    return result;
  }

  return (
    <YStack fullscreen alignItems='center' gap={2} justifyContent='center' backgroundColor={'$blue10'}>
      <Text alignContent='center' justifyContent='center' fontSize={25} color='white'>
        Identificador de  Animal Marinho
      </Text>
      {img && (
        <Image
          source={{ uri: img }}
          style={{ backgroundColor: 'whitesmoke' }}
          width="80%"
          height="20%"
          resizeMode='stretch'
        />
      )}
      {label && (
        <Text textTransform='uppercase' fontSize={25} color='white'>
          {labelMapping[label]?.displayName || label}
          {' '}
          <MaterialCommunityIcons
            name={(labelMapping[label]?.iconName || 'question-mark') as any}
            size={24}
            color='white'
          />
        </Text>
      )}
      <Button onPress={pickImg}>
        <ButtonText>Adicionar imagem!</ButtonText>
      </Button>
    </YStack>
  );
}
