import React, { useEffect, useState } from "react";
import "./dietPlan.css";
import { API_BASE_URL } from "../../config";

const foods = [
  {
    name: "Chicken Breast",
    image: "https://i.pinimg.com/564x/cb/6a/4c/cb6a4caef7e5bfc59a75402b9f7f5a0d.jpg",
    serving: "100g",
    protein: "31g",
    calories: "165 kcal",
    benefits: "High-quality lean protein; low in fat; supports muscle repair"
  },
  {
    name: "Egg",
    image: "https://i.pinimg.com/736x/4c/2d/40/4c2d4047e29e4852be3dd161ef189e21.jpg",
    serving: "1 large egg",
    protein: "6g",
    calories: "70 kcal",
    benefits: "Complete protein; contains B12, choline, and healthy fats"
  },
  {
    name: "Tofu",
    image: "https://thumb.ac-illust.com/55/555b9a8a2bd7af52d94618dbba2ed1b3_t.jpeg",
    serving: "100g",
    protein: "8-10g",
    calories: "145 kcal",
    benefits: "Plant-based protein; contains iron and calcium"
  },
  {
    name: "Brown rice (cooked)",
    image: "https://static.vecteezy.com/system/resources/previews/050/906/803/non_2x/a-bowl-of-brown-rice-on-a-black-background-free-png.png",
    serving: "195g (1 cup)",
    protein: "5g",
    calories: "215 kcal",
    benefits: "Steady-release carbs; rich in B vitamins and minerals."
  },
  {
    name: "Oats",
    image: "https://i0.wp.com/www.neverfreefarm.com/wp-content/uploads/2017/02/oats.png?resize=429%2C520&ssl=1",
    serving: "40g (½  cup dry)",
    protein: "5g",
    calories: "150 kcal",
    benefits: "High in beta-glucan fiber; stabilizes blood sugar; slow energy release."
  },
  {
    name: "Sweet potatoes (cooked, mashed)",
    image: "https://png.pngtree.com/png-clipart/20220705/ourmid/pngtree-fresh-sweet-potato-png-image_5682513.png",
    serving: "150g (1 medium)",
    protein: "2 - 2.5g",
    calories: "130 kcal",
    benefits: "Antioxidant-rich; slow-digesting carb; high in vitamin A."
  },
  {
    name: "Banana (medium)",
    image: "https://media.istockphoto.com/id/521504766/vector/vector-single-cartoon-banana.jpg?s=612x612&w=0&k=20&c=lsjccKhPWEDqn46UvFlNBuFRe-hnagppCqZny4PhJXE=",
    serving: "1 banana (~118g)",
    protein: "1.3g",
    calories: "105 kcal",
    benefits: "Potassium-rich; quick energy pre/post-workout. Fast-digesting carb; high in potassium (prevents cramps)."
  },
  {
    name: "Whole wheat bread",
    image: "https://media.istockphoto.com/id/508917386/vector/whole-grain-sliced-bread-isolated-on-white-vector.jpg?s=612x612&w=0&k=20&c=AP8oTc4g8anBZWMgWgjTn72DWLoXFiI9t2J1zdoW1A8=",
    serving: "1 slice (30g)",
    protein: "3 - 5g",
    calories: "8 - 100 kcal",
    benefits: "Convenient complex carb + fiber."
  },
  {
    name: "Milk (low-fat)",
    image: "https://png.pngtree.com/png-vector/20191031/ourmid/pngtree-milk-bottle-vector-illustration-with-filled-line-design-isolated-on-white-png-image_1928826.jpg",
    serving: "1 cup (240ml)",
    protein: "8g",
    calories: "102 kcal",
    benefits: "Quick source of protein + calcium."
  },
  {
    name: "Greek Yogurt",
    image: "https://thumb.ac-illust.com/49/498109f6244985f5af61ae0c35429003_t.jpeg",
    serving: "170g (6 oz)",
    protein: "17-20g",
    calories: "100 kcal",
    benefits: "High in casein and whey; contains probiotics for gut health."
  },
  {
    name: "Cottage cheese (low-fat)",
    image: "https://thumb.ac-illust.com/a1/a171928097ed0a7fb00bb83599165284_t.jpeg",
    serving: "100g (about ½ cup)",
    protein: "11–13g",
    calories: "80-100 kcal",
    benefits: "Slow-digesting protein (casein); great for overnight muscle repair."
  },
  {
    name: "Shrimp",
    image: "https://cdn.creazilla.com/cliparts/15501/shrimp-clipart-xl.png",
    serving: "100g",
    protein: "24g",
    calories: "99 kcal",
    benefits: "Low-calorie protein; contains iodine and antioxidants."
  },
  {
    name: "Avocado",
    image: "https://png.pngtree.com/png-clipart/20191120/original/pngtree-avocado-fruit-vector-cartoon-design-for-children-s-knowledge-and-learning-png-image_5045487.jpg",
    serving: "½ medium (100g)",
    protein: "2g",
    calories: "160 kcal",
    benefits: "Healthy fats + fiber; supports recovery."
  },
  {
    name: "Tuna",
    image: "https://media.istockphoto.com/id/619742070/vector/can-of-tuna.jpg?s=612x612&w=0&k=20&c=AtrKqw_Fqd7QDKK1Yx9n4MpTkKAX3Kwrg3LV7YNLAoY=",
    serving: "100g (about ½ a standard can)",
    protein: "23-25g",
    calories: "100–120 kcal",
    benefits: "High in lean protein– great for building and maintaining muscle."
  },
  {
    name: "Broccoli (steamed)",
    image: "https://www.shutterstock.com/image-vector/plate-green-broccoli-vector-illustration-600nw-2355314751.jpg",
    serving: "1 cup (156g)",
    protein: "4.7g",
    calories: "55 kcal",
    benefits: "High in fiber, vitamin C, antioxidants, supports recovery"
  },
  {
    name: "Carrots (raw)",
    image: "https://i.pinimg.com/736x/27/93/be/2793be522f0cbedc41bd0b1dfa0349ee.jpg",
    serving: "1 cup (128g)",
    protein: "1.2g",
    calories: "52 kcal",
    benefits: "Beta-carotene for eye health and recovery"
  },
  {
    name: "Scallops",
    image: "https://png.pngtree.com/png-clipart/20210308/original/pngtree-scallop-seafood-decoration-illustration-png-image_5753674.jpg",
    serving: "100g (about 4–5 large scallops)",
    protein: "17-20g",
    calories: "92 kcal",
    benefits: "Supports muscle growth and repair with minimal fat."
  },
  {
    name: "Peanut",
    image: "https://cdn.creazilla.com/cliparts/22447/peanut-clipart-lg.png",
    serving: "28g (about 1 ounce or a small handful)",
    protein: "7g",
    calories: "160–170 kcal",
    benefits: "Supports muscle repair, especially for vegetarians.Supports muscle function and energy metabolism."
  },
  {
    name: "Pork Tenderloin",
    image: "https://static.vecteezy.com/system/resources/thumbnails/049/580/467/small_2x/juicy-roasted-pork-loin-wrapped-in-crispy-bacon-slices-and-garnished-with-fresh-thyme-and-rosemary-vector.jpg",
    serving: "100g",
    protein: "26g",
    calories: "143 kcal",
    benefits: "Great for building and repairing muscle tissue"
  },
  {
    name: "Lean beef",
    image: "https://www.vhv.rs/dpng/d/12-126661_beef-clipart-hd-png-download.png",
    serving: "100g",
    protein: "25-28g",
    calories: "200–250 kcal",
    benefits: "Supports strength, performance, and recovery. Rich in all essential amino acids for muscle repair."
  },

  {
    name: "Salmon (Baked)",
    image: "https://png.pngtree.com/png-clipart/20230406/original/pngtree-salmon-fillets-png-image_9030252.png",
    serving: "100g (3.5 oz, cooked)",
    protein: "22g",
    calories: "206 kcal",
    benefits: "Builds and repairs muscle efficiently; Reduces inflammation, supports joint health & recovery."
  },

  {
    name: "Spinach",
    image: "https://www.clipartmax.com/png/middle/3-36266_clipart-spinach-clipart.png",
    serving: "1 cup (30g)",
    protein: "0.9g",
    calories: "7 kcal",
    benefits: "Supports oxygen delivery & endurance; Helps reduce inflammation & protect muscle cells"
  },
  
  {
    name: "Mushrooms",
    image: "https://img.favpng.com/5/12/12/common-mushroom-edible-mushroom-clip-art-png-favpng-mW0CyQHZ8WqQSfAZy4zKmDiX1.jpg",
    serving: "1 cup (156g cooked)",
    protein: "3g",
    calories: "35 kcal",
    benefits: "Supports muscle repair, especially in plant-based diets"
  },
  
  {
    name: "Dark Chocolate",
    image: "https://static.vecteezy.com/system/resources/thumbnails/051/482/892/small_2x/chocolate-bar-with-splashes-and-splashes-vector.jpg",
    serving: "1 square (28g)",
    protein: "2-3g",
    calories: "170–190 kcal",
    benefits: "Reduces oxidative stress after intense training;Enhances oxygen delivery to muscles and brain"
  },

  {
    name: "Pumpkin (Boiled)",
    image: "https://img.freepik.com/premium-vector/pumpkin-whole-slice-pumpkin-autumn-vegetable-nightshade-family-cooking-decorating-halloween-farm-products-vegetarian-food-preparation-vector-illustration-farmers_433804-1641.jpg",
    serving: "1 cup (245g cooked)",
    protein: "2g",
    calories: "49 kcal",
    benefits: "Supports immune function and recovery; Supports muscle function and reduces cramping"
  },

  {
    name: "Chia Seeds",
    image: "https://www.shutterstock.com/image-vector/logo-illustration-chia-seeds-poured-600nw-2371212795.jpg",
    serving: "2 tablespoons (28g)",
    protein: "4.7g",
    calories: "138 kcal",
    benefits: "Reduces inflammation and aids recovery; Helps maintain hydration during long workouts"
  },

  {
    name: "Protein Bar",
    image: "https://media.istockphoto.com/id/1404427493/vector/protein-bar-pack-flat-vector-illustration-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=7XWYJwEIRdARYphTtyJgciZPe8iFjU3ziHwVh0BVi9g=",
    serving: "1 bar (varies by brand, ~50–60g)",
    protein: "15–25 grams.9g",
    calories: "180–250 kcal",
    benefits: "Supports muscle recovery and growth post-workout; Promotes fullness and better digestion"
  },

  {
    name: "Apple",
    image: "https://media.istockphoto.com/id/506670795/vector/red-apple.jpg?s=612x612&w=0&k=20&c=lF9vQ-kQPv3StsSFND4Okt1yqEO86q2XWFECgn0AqWU=",
    serving: "(Medium, ~180g)",
    protein: "0.5g",
    calories: "95 kcal",
    benefits: "Great for quick energy pre-workout; Apples are ~86% water—good for hydration"
  },

  {
    name: "Quinoa",
    image: "https://classroomclipart.com/image/static7/preview2/bowl-of-quinoa-clip-art-59429.jpg",
    serving: " 1 cup (185g cooked)",
    protein: "8g",
    calories: "222 kcal",
    benefits: "Contains all 9 essential amino acids—rare for a grain; Provides sustained energy for workouts"
  },

  {
    name: "Sardines (Canned in oil)",
    image: "https://www.shutterstock.com/shutterstock/photos/1706596129/display_1500/stock-vector-vector-illustration-canned-sardines-in-tomato-sauce-1706596129.jpg",
    serving: "1 can (~92g drained)",
    protein: "22-24g",
    calories: "190–210 kcal",
    benefits: "Supports muscle repair and growth; Supports bone strength and muscle contraction"
  },

];

function calculateCalories({ weight, height, age, sex, daysOfExercise }) {
  // Mifflin-St Jeor Equation
  // weight in kg, height in cm, age in years
  let bmr;
  if (sex === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  // Activity factor based on days of exercise
  let activityFactor = 1.2; // sedentary
  if (daysOfExercise >= 1 && daysOfExercise <= 2) activityFactor = 1.375;
  else if (daysOfExercise >= 3 && daysOfExercise <= 5) activityFactor = 1.55;
  else if (daysOfExercise >= 6) activityFactor = 1.725;
  const maintenance = Math.round(bmr * activityFactor);
  return {
    maintain: maintenance,
    lose: maintenance - 400,
    build: maintenance + 300,
    loseALot: maintenance - 700,
  };
}

function DietPlan() {
  const navigate = (window.reactNavigate || ((path) => { window.location.href = path; })); // fallback for non-router context
  const [user, setUser] = useState(null);
  const [showCalorieModal, setShowCalorieModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add('dietplan-bg');
    return () => {
      document.body.classList.remove('dietplan-bg');
    };
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        // Fetch user profile
        const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch user profile");
        const data = await response.json();
        // Fetch user preferences for days
        let daysOfExercise = 3;
        try {
          const prefRes = await fetch(`${API_BASE_URL}/userpreferences`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (prefRes.ok) {
            const prefData = await prefRes.json();
            // Parse days string like '2x a week' to get the number
            if (prefData.days) {
              const match = prefData.days.match(/(\d+)/);
              if (match) daysOfExercise = parseInt(match[1], 10);
            }
          }
        } catch {}
        // Calculate age from birthday if available
        let age = 25;
        if (data.birthday) {
          const birthDate = new Date(data.birthday);
          const today = new Date();
          age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
        }
        setUser({
          weight: parseFloat(data.weight),
          height: parseFloat(data.height),
          sex: data.gender || 'female',
          age,
          daysOfExercise,
        });
      } catch (err) {
        setUser({
          weight: 70,
          height: 170,
          sex: "female",
          age: 25,
          daysOfExercise: 3,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  if (loading || !user) return <div>Loading...</div>;
  const calorieSuggestions = calculateCalories(user);
  return (
    <>
      {/* Full-page background overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80') no-repeat center center fixed",
        backgroundSize: 'cover',
        zIndex: 0,
        pointerEvents: 'none',
      }} />
      {/* Main content */}
      <div style={{ background: 'transparent', position: 'relative', zIndex: 1 }}>
        {/* Consistent Navbar */}
        <nav style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '70px', background: '#142850',
          padding: '0 40px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', zIndex: 3000
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <h1 style={{ fontSize: '24px', color: '#ffffff', fontWeight: 'bold', margin: 0 }}>
              Welcome to <span style={{ color: '#4da6ff' }}>FitnessPro</span>
            </h1>
            <div style={{ display: 'flex', gap: '20px', margin: 0 }}>
              <button style={navBtnStyle} onClick={() => navigate('/goal-setting')}>Home</button>
              <button style={navBtnStyle} onClick={() => navigate('/workout-progress')}>Progress</button>
              <button style={navBtnStyle} onClick={() => navigate('/profile')}>Profile</button>
              <button style={navBtnStyle} onClick={() => navigate('/search')}>Search</button>
            </div>
          </div>
        </nav>
        {/* Main Content Card */}
        <div style={{
          marginTop: '110px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          minHeight: 'calc(100vh - 110px)',
          paddingBottom: '40px',
          position: 'relative',
          zIndex: 2000,
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.97)',
            borderRadius: '18px',
            boxShadow: '0 6px 32px rgba(0,0,0,0.18)',
            padding: '40px 32px',
            maxWidth: '1000px',
            width: '100%',
            position: 'relative',
            zIndex: 2001,
          }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <button style={{ ...navBtnStyle, background: '#ff914d' }} onClick={() => setShowCalorieModal(true)}>
                Calorie Tracker
              </button>
            </div>
            {/* Calorie Tracker Modal */}
            {showCalorieModal && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.4)',
                zIndex: 4000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{
                  background: 'white',
                  borderRadius: 16,
                  padding: 32,
                  minWidth: 320,
                  maxWidth: 400,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                  position: 'relative',
                }}>
                  <button onClick={() => setShowCalorieModal(false)} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#888' }}>&times;</button>
                  <h2 style={{ textAlign: 'center', color: '#183153', marginBottom: 18 }}>Calorie Tracker</h2>
                  <div style={{ marginBottom: 12, fontSize: 15, color: '#444', textAlign: 'center' }}>
                    <b>For a {user.age} year old {user.sex} who is {user.height}cm and {user.weight}kg, exercising {user.daysOfExercise} days/week:</b>
                  </div>
                  <ul className="calorie-modal-list" style={{ listStyle: 'none', padding: 0, fontSize: 16 }}>
                    <li><b>Maintain weight:</b> {calorieSuggestions.maintain} kcal/day</li>
                    <li><b>Lose weight:</b> {calorieSuggestions.lose} kcal/day</li>
                    <li><b>Build muscle:</b> {calorieSuggestions.build} kcal/day</li>
                    <li><b>Lose A LOT of weight:</b> {calorieSuggestions.loseALot} kcal/day</li>
                  </ul>
                  <div style={{ fontSize: 13, color: '#888', marginTop: 16, textAlign: 'center' }}>
                    *Values are estimates.
                  </div>
                </div>
              </div>
            )}
            <h1 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 'bold', color: '#183153', marginBottom: '32px' }}>Nutrition Guide</h1>
            <div style={{ overflowX: 'auto' }}>
              <table className="food-table">
                <thead>
                  <tr>
                    <th>Food</th>
                    <th>Serving Size</th>
                    <th>Protein</th>
                    <th>Calories</th>
                    <th>Key Benefits</th>
                  </tr>
                </thead>
                <tbody>
                  {foods.map((food) => (
                    <tr key={food.name}>
                      <td>
                        <img src={food.image} alt={food.name} className="food-img" />
                        <div>{food.name}</div>
                      </td>
                      <td>{food.serving}</td>
                      <td>{food.protein}</td>
                      <td>{food.calories}</td>
                      <td>{food.benefits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const navBtnStyle = {
  background: '#4da6ff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '8px',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: '0.3s',
  margin: 0,
};

export default DietPlan;