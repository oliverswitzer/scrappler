export async function randomDelay(millis: number) {
  const randomOffsetToSleepMillis = Math.trunc(Math.random() * millis);

  console.log(
    `Delaying executing of scrapping by a random offset of ${
      randomOffsetToSleepMillis / 1000
    } seconds`
  );

  return sleep(randomOffsetToSleepMillis);
}

async function sleep(milliseconds: number) {
  return new Promise((res, rej) => {
    setTimeout(res, milliseconds);
  });
}
