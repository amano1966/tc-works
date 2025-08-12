import { connect } from 'trimble-connect-workspace-api';

export async function loadViewer(container, projectId, modelId, token) {
  container.src =
    `https://app.connect.trimble.com/tc/viewer?projectId=${projectId}&modelId=${modelId}&accessToken=${token}`;
  container.style.display = 'block';

  return new Promise((resolve) => {
    container.addEventListener('load', async () => {
      const api = await connect(container.contentWindow, '*');
      resolve(api);
    }, { once: true });
  });
}

export async function addLine(api) {
  await api.viewer3d.startMarkupMode({ type: 'polyline', color: '#00ff00', lineWidth: 2 });
}

export async function addCircle(api) {
  await api.viewer3d.startMarkupMode({ type: 'circle', color: '#0000ff', lineWidth: 2 });
}
