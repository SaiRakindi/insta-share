import Loader from 'react-loader-spinner'

const LoaderSpinner = () => (
  <div className="loader-container" data-testid="loader">
    <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
  </div>
)

export default LoaderSpinner
