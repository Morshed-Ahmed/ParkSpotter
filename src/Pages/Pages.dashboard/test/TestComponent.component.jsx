import { useSelector } from 'react-redux';
import { selectAllStates, selectZones } from '../../../store/registration/registration.selector';

function TestComponent() {
  const data = useSelector(selectAllStates);
  const zones = useSelector(selectZones);

  return (
    <div>
      {/* Display user data */}
      {Object.keys(data).map((key, index) => (
        <span key={key}>
          {`${key} = ${data[key]}`}
          {index !== Object.keys(data).length - 1 && <br />}
        </span>
      ))}

      {/* Display zones */}
      {zones.length > 0 ? (
        zones.map((zone, index) => (
          <h1 key={index}>{zone}</h1>
        ))
      ) : (
        <span>none</span>
      )}
    </div>
  );
}


export default TestComponent
