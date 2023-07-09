import { useState, useRef } from 'react';
import { EditableText } from './components/EditableText';

const orig = ['one', 'two', 'three'];

function EditableArray() {
  console.log("Editable Array is executed")
  const [ array, setArray ] = useState<string[]>(orig);
  const [ isModified, setIsModified ] = useState(false)
  const refArray = useRef([...array]);


  const isDiffer = (arr1: string[], arr2: string[]) => {
    if (arr1.length !== arr2.length) return true;
    for (let i=0; i<arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return true;
    }
    return false;
  }

  const updateArray =() => {
    setArray([...refArray.current])
  }

  const setValue = (index: number) => {
    return (text: string) => {
      refArray.current[index] = text;
      if(text !== orig[index] && !isModified) {
      // if(text !== orig[index]) {
        console.log("set isModified = true")
        setIsModified(true);
        setArray([...refArray.current])
      // } else if (!isDiffer(orig, refArray.current)) {
      } else if (!isDiffer(orig, refArray.current) && isModified) {
        console.log("set isModified = false")
        setIsModified(false)
        setArray([...orig])
      }
        console.log(isModified, array, refArray.current)
      // if (index === 2) {
      //   const newArray = [...refArray.current];
      //   setArray(newArray);

      // }
    };
  };

  return (
    <div className="App" onKeyDown={() => console.log("Array KeyDown")}>
      <h1>Controlled contenteditable elements</h1>
      {refArray.current.map((text, i) => (
        <EditableText key={i} value={text} setValue={setValue(i)} />
      ))}
      <button onClick={updateArray}>Update</button>
    </div>
  );
}

export default EditableArray;
