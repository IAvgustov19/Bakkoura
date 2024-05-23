import storage, {FirebaseStorageTypes} from '@react-native-firebase/storage';
import ImageCropPicker, {Image} from 'react-native-image-crop-picker';

export default class StorageApi {
  static uploadImage = async ({
    file,
  }: {
    file: Image;
  }): Promise<string | null> => {
    const uniqueFileName = `${Date.now()}__${file.filename}`;
    try {
      const res = await storage()
        .ref(`images/${uniqueFileName}.${file.mime.split('/')[1]}`)
        .putFile(file.path);

      return await getUrlFromStorage(res);
    } catch (error) {
      console.log(['[Error-uploadImage]:', error]);
      return null;
    }
  };
}

export const getUrlFromStorage = async (
  data: FirebaseStorageTypes.TaskSnapshot,
): Promise<string | null> => {
  try {
    const reference = storage().ref(data.metadata.fullPath);
    const url = await reference.getDownloadURL();
    return url;
  } catch (err) {
    console.log(['[Error-getUrlFromStorage]:', err]);
    return null;
  }
};

export const pickImageFromDevice = async ({
  height,
  width,
  withCircleOverlay = false,
}: {
  height: number;
  width: number;
  withCircleOverlay?: boolean;
}): Promise<Image> => {
  const file = await ImageCropPicker.openPicker({
    width: width,
    height: height,
    multiple: false,
    cropperCircleOverlay: withCircleOverlay,
    mediaType: 'photo',
    compressImageQuality: 0.8,
    // cropperCancelText: 'Отменить',
    // cropperChooseText: 'Выбрать',
    cropping: true,
  });

  return file;
};
