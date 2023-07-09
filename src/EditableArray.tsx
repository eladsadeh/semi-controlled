import { useState, useRef } from 'react';
import { EditableText } from './components/EditableText';

const orig = ['one', 'two', 'three'];

class TextArray {
  texts: string[];
 
  constructor(arr: string[]) {
    this.texts = arr;
  }
 
  isSameAs(other: string[]) {
    if (other.length !== this.texts.length) return false;
    for (let i=0; i<other.length; i++) {
      if (other[i] !== this.texts[i]) return false;
    }
    return true;
  }
}

function EditableArray() {
  console.log("Editable Array is executed")
  const [ array, setArray ] = useState<string[]>(orig);
  const [ isModified, setIsModified ] = useState(false)
  const refArray = useRef(new TextArray(orig));


  // const isDiffer = (arr1: string[], arr2: string[]) => {
  //   if (arr1.length !== arr2.length) return true;
  //   for (let i=0; i<arr1.length; i++) {
  //     if (arr1[i] !== arr2[i]) return true;
  //   }
  //   return false;
  // }

  const updateArray =() => {
    setArray([...refArray.current.texts])
  }

  const setValue = (index: number) => {
    const texts = refArray.current;
    console.log(texts.isSameAs(orig))
    return (text: string) => {
      texts.texts[index] = text;
      if(text !== orig[index] && !isModified) {
      // if(text !== orig[index]) {
        console.log("set isModified = true")
        setIsModified(true);
        setArray([...texts.texts])
      // } else if (!isDiffer(orig, refArray.current)) {
      } else if (texts.isSameAs(orig) && isModified) {
        console.log("set isModified = false")
        setIsModified(false)
        setArray([...orig])
      }
        console.log(isModified, array, refArray.current.texts)
      // if (index === 2) {
      //   const newArray = [...refArray.current];
      //   setArray(newArray);

      // }
    };
  };

  return (
    <div className="App">
      <h1>Controlled contenteditable elements</h1>
      {refArray.current.texts.map((text, i) => (
        <EditableText key={i} value={text} setValue={setValue(i)} />
      ))}
      <button onClick={updateArray}>Update</button>
    </div>
  );
}

export default EditableArray;
