router.post("/signup", async (req, res) => {
    try {
        console.log("Signup request received"); // Debugging
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Missing fields" });
        }
        // Additional user registration logic
        res.status(201).json({ message: "User created" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



