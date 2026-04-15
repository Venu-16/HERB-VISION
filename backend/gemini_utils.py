import os

try:
    import google.generativeai as genai
except ImportError:
    genai = None


def generate_plant_details(plant_name: str) -> str:
    """Use Gemini to generate medicinal plant information for the predicted plant."""
    if not plant_name:
        return ""

    if genai is None:
        raise RuntimeError("google-generativeai is not installed")

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise EnvironmentError("GEMINI_API_KEY is not configured")

    genai.configure(api_key=api_key)
    prompt = (
        f"You are an expert on medicinal plants. Provide a concise description of the plant '{plant_name}', "
        "including its key medicinal uses, benefits, and any important caution notes. "
        "Keep the response short and easy to read."
    )

    response = genai.generate_text(model=os.environ.get("GEMINI_MODEL", "gemini-1.5"), prompt=prompt)
    return getattr(response, "text", "").strip()
