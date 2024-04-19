const evtSource = new EventSource(`/fixture-stream`);
evtSource.onmessage = function (event) {
  const data = JSON.parse(event.data);

  console.log(data.name);

  const contentWrapper = document.getElementsByClassName('content-wrapper')[0];

  // Clear the existing content
  contentWrapper.innerHTML = '';

  // Create the fixture_row HTML
  const fixtureHTML = /*html*/ `
    <div>${data.name}</div>
   `;

  // Insert the fixtureRowHTML inside table_wrapper
  contentWrapper.innerHTML += fixtureHTML;

  console.log(data);
};
