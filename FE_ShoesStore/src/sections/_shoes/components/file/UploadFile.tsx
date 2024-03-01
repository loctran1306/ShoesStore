import React from 'react';

type props = {
  multi: boolean;
  refFile: React.RefObject<HTMLInputElement>;
  handleInputFile: (e: any) => void;
};
function UploadFiles({ multi, refFile, handleInputFile }: props) {
  return (
    <input
      multiple={multi}
      type="file"
      accept="image/*"
      ref={refFile}
      onInput={handleInputFile}
      onClick={(e: any) => {
        e.target.value = null;
      }}
      hidden
    />
  );
}

export default UploadFiles;
