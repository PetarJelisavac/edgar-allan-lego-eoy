import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderStore } from '../../store/orderStore';

function OrderConfirmation() {
  const navigate = useNavigate();
  const { userData, submitOrder, resetOrder } = useOrderStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitOrder();
      setIsSuccess(true);
      setTimeout(() => {
        resetOrder();
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error submitting your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#fefff8',
        display: 'flex',
        flexDirection: 'column',
        padding: 'clamp(16px, 2vw, 16px)'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '3.3125rem',
          width: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '120px', textAlign: 'center' }}>🎉</div>
          <h1 style={{
            fontFamily: 'Epilogue, sans-serif',
            fontWeight: 600,
            fontSize: '36px',
            color: 'black',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            margin: 0,
            textAlign: 'center'
          }}>
            Order Submitted!
          </h1>
          <p style={{
            fontFamily: 'Petrona, serif',
            fontSize: '18px',
            color: '#1169fe',
            margin: 0,
            textAlign: 'center',
            maxWidth: '600px'
          }}>
            We'll send your LEGO Edgar set soon. Check your email for confirmation.
          </p>
          <p style={{
            fontFamily: 'Petrona, serif',
            fontSize: '16px',
            color: '#000',
            margin: 0,
            textAlign: 'center'
          }}>
            Redirecting to home...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fefff8',
      display: 'flex',
      flexDirection: 'column',
      padding: 'clamp(16px, 2vw, 16px)'
    }}>
      {/* Main Content Area - Full Width for Bigger Card */}
      <div style={{
        display: 'flex',
        gap: '80px',
        alignItems: 'center',
        width: '100%',
        flex: '1 1 0%',
        minHeight: '0',
        justifyContent: 'center'
      }}>
        {/* Form Card - Bigger to hold all information */}
        <div style={{
          border: '1px solid #c6c6c6',
          borderRadius: 'clamp(20px, 2.5vw, 30px)',
          padding: 'clamp(30px, 4vw, 60px)',
          width: '100%',
          maxWidth: '900px',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(24px, 3vw, 40px)',
          flex: '1 1 auto'
        }}>
          {/* Step Label and Question */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(12px, 1.5vw, 20px)',
            width: '100%'
          }}>
            <p style={{
              fontFamily: 'Petrona, serif',
              fontWeight: 600,
              fontStyle: 'italic',
              fontSize: '16px',
              color: '#272727',
              margin: 0
            }}>
              Step 5 of 5
            </p>
            <h2 style={{
              fontFamily: 'Epilogue, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(24px, 3vw, 32px)',
              color: '#272727',
              margin: 0
            }}>
              Review Your Order
            </h2>
            <p style={{
              fontFamily: 'Epilogue, sans-serif',
              fontSize: '16px',
              color: '#666',
              margin: 0
            }}>
              Please confirm your information before submitting
            </p>
          </div>

          {/* Order Information */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(20px, 3vw, 32px)',
            width: '100%'
          }}>
            {/* Personal Information */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'clamp(16px, 2vw, 24px)',
              width: '100%'
            }}>
              <div>
                <h3 style={{
                  fontFamily: 'Epilogue, sans-serif',
                  fontWeight: 600,
                  fontSize: '18px',
                  color: '#000000',
                  margin: '0 0 8px 0'
                }}>
                  Name
                </h3>
                <p style={{
                  fontFamily: 'Epilogue, sans-serif',
                  fontSize: '20px',
                  fontWeight: 500,
                  color: '#272727',
                  margin: 0
                }}>
                  {userData.name || 'Not provided'}
                </p>
              </div>
              <div>
                <h3 style={{
                  fontFamily: 'Epilogue, sans-serif',
                  fontWeight: 600,
                  fontSize: '18px',
                  color: '#000000',
                  margin: '0 0 8px 0'
                }}>
                  Email
                </h3>
                <p style={{
                  fontFamily: 'Epilogue, sans-serif',
                  fontSize: '20px',
                  fontWeight: 500,
                  color: '#272727',
                  margin: 0
                }}>
                  {userData.email || 'Not provided'}
                </p>
              </div>
              <div>
                <h3 style={{
                  fontFamily: 'Epilogue, sans-serif',
                  fontWeight: 600,
                  fontSize: '18px',
                  color: '#000000',
                  margin: '0 0 8px 0'
                }}>
                  Company
                </h3>
                <p style={{
                  fontFamily: 'Epilogue, sans-serif',
                  fontSize: '20px',
                  fontWeight: 500,
                  color: '#272727',
                  margin: 0
                }}>
                  {userData.company || 'Not provided'}
                </p>
              </div>
              <div>
                <h3 style={{
                  fontFamily: 'Epilogue, sans-serif',
                  fontWeight: 600,
                  fontSize: '18px',
                  color: '#000000',
                  margin: '0 0 8px 0'
                }}>
                  Position
                </h3>
                <p style={{
                  fontFamily: 'Epilogue, sans-serif',
                  fontSize: '20px',
                  fontWeight: 500,
                  color: '#272727',
                  margin: 0
                }}>
                  {userData.position || 'Not provided'}
                </p>
              </div>
              {userData.phone && (
                <div>
                  <h3 style={{
                    fontFamily: 'Epilogue, sans-serif',
                    fontWeight: 600,
                    fontSize: '18px',
                    color: '#000000',
                    margin: '0 0 8px 0'
                  }}>
                    Phone
                  </h3>
                  <p style={{
                    fontFamily: 'Epilogue, sans-serif',
                    fontSize: '20px',
                    fontWeight: 500,
                    color: '#272727',
                    margin: 0
                  }}>
                    {userData.phone}
                  </p>
                </div>
              )}
            </div>

            {/* Delivery Address */}
            <div style={{
              borderTop: '1px solid #e5e5e5',
              paddingTop: 'clamp(16px, 2vw, 24px)'
            }}>
              <h3 style={{
                fontFamily: 'Epilogue, sans-serif',
                fontWeight: 600,
                fontSize: '18px',
                color: '#000000',
                margin: '0 0 8px 0'
              }}>
                Delivery Address
              </h3>
              <p style={{
                fontFamily: 'Epilogue, sans-serif',
                fontSize: '20px',
                fontWeight: 500,
                color: '#272727',
                margin: 0,
                whiteSpace: 'pre-line'
              }}>
                {userData.address || 'Not provided'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: 'clamp(16px, 2vw, 24px)',
            width: '100%'
          }}>
            <button
              type="button"
              onClick={() => navigate('/order/step-3')}
              disabled={isSubmitting}
              style={{
                backgroundColor: '#fefff8',
                border: '1px solid #1169fe',
                borderRadius: '9999px',
                padding: '13.5px 30px',
                height: 'clamp(44px, 5vw, 50px)',
                minWidth: 'clamp(100px, 12vw, 150px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.5 : 1,
                transition: 'opacity 0.2s',
                flex: 1
              }}
            >
              <p style={{
                fontFamily: 'Petrona, serif',
                fontWeight: 500,
                fontStyle: 'italic',
                fontSize: 'clamp(16px, 1.8vw, 20px)',
                color: '#1169fe',
                margin: 0
              }}>
                Edit
              </p>
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                backgroundColor: '#1169fe',
                border: 'none',
                borderRadius: '9999px',
                padding: '13.5px 30px',
                height: 'clamp(44px, 5vw, 50px)',
                minWidth: 'clamp(100px, 12vw, 150px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.5 : 1,
                transition: 'opacity 0.2s',
                flex: 1
              }}
            >
              <p style={{
                fontFamily: 'Petrona, serif',
                fontWeight: 500,
                fontStyle: 'italic',
                fontSize: 'clamp(16px, 1.8vw, 20px)',
                color: '#fefff8',
                margin: 0
              }}>
                {isSubmitting ? 'Submitting...' : 'Submit Order'}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
