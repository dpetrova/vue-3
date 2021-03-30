//making setTimeout an async/await function
async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export const eventApi = {
    getEventCount: async (search, items) => {
      await wait(1000);
      return items.filter(x => x.toLowerCase().includes(search.toLowerCase()))     
    }
  }