import ForgeUI, {
  render,
  Fragment,
  Text,
  SpacePage,
  Button,
  SpaceSettings,
  Form,
  TextArea,
  Heading,
  useEffect,
  useState,
} from '@forge/ui';
import { storage } from "@forge/api";

export async function getText() {
  const text = await storage.get('text');
  console.log('getText', { text });
  return text;
}

async function setText(text) {
  await storage.set('text', text);
  console.log('setText', { text });
}

export function useWord() {
  const [word, setWord] = useState("poop");

  useEffect(() => {
    async function getWord() {
      console.log('getting word')
      const text = await getText();
      console.log('got word', { text })
      setWord(text);
      console.log('set word', { text })
    }

    getWord()
  }, []);

  return {
    word,
    async setWord(text) {
      setText(text);
      setWord(text)
    }
  };
}

const App = (props) => {

  const {word, setWord} = useWord();
  console.log({ word });

  function handleOnClick() {
    console.log("💩");
  }

  return (
    <Fragment>
      <Heading>Whats the word</Heading>
      <Form onSubmit={async ({ word }) => { await setWord(word) }}>
        <TextArea label="The Word" name="word" isRequired defaultValue={word}/>
      </Form>

      <Text>The word is { word }</Text>

      <Button text="Do a poop!" onClick={handleOnClick}/>
    </Fragment>
  );
};

export const poop = render(
  <SpaceSettings>
    <App/>
  </SpaceSettings>
)
