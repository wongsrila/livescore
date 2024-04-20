const evtSource = new EventSource(`/fixture-stream`);
evtSource.onmessage = function (event) {
  const data = JSON.parse(event.data);

  const contentWrapper = document.getElementsByClassName('content-wrapper')[0];

  // Clear the existing content
  contentWrapper.innerHTML = '';

  // Create the fixture_row HTML
  const fixtureHTML = /*html*/ `
    <div class="breadcrumb">

    </div>
   `;

  // Insert the fixtureRowHTML inside table_wrapper
  contentWrapper.innerHTML += fixtureHTML;

  console.log(data);
};
