export const fileToDataUri = (file: any) =>
  new Promise((resolve, reject) => {
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  });

export const base64ToFile = (base64String: string, fileName: string) => {
  const contentType = base64String.split(';')[0].split(':')[1];
  const byteCharacters = atob(base64String.split(',')[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  const file = new File([blob], fileName, { type: contentType });

  return file;
};

export const removeNullProperties = (obj: object) => {
  return Object.fromEntries(Object.entries(obj).filter(([key, value]) => value !== null && value !== ''));
};

export const formatMoneyToVND = (number: number) => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return formatter.format(number);
};

export const formatMoneyToCN = (number: number) => {
  const formatter = new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
  });

  return formatter.format(number);
};

export const sendTokenToChromeExtension = ({ extensionId, jwt }: { extensionId: string; jwt: string }) => {
  console.log(`Attempt in sending message to ${extensionId}`);
  if (chrome.runtime && chrome.runtime.sendMessage) {
    chrome.runtime.sendMessage(extensionId, { jwt }, (response: any) => {
      if (!response?.success) {
        console.log(`Error sending message to ${extensionId}`, response);
        return response;
      }
      console.log(`Sucesss sending to ${extensionId}`, response.message);
    });
  }
};
